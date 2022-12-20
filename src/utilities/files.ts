import { promises as fsPromises } from 'fs';
import { constants } from 'fs/promises';
import _ from 'lodash';
import sharp from 'sharp';
import appRootPath from 'app-root-path';

// To list directory content
export async function listDir(relativePath: string): Promise<Array<string>> {
    try {
        return await fsPromises.readdir(`${appRootPath.path}/${relativePath}`)
    } catch {
        return [];
    }
}

// To check if file is present
export async function filePresent(relativePath: string): Promise<boolean> {
    try {
        await fsPromises.access(`${appRootPath.path}/${relativePath}`, constants.F_OK)
        return true
    } catch (e: unknown) {
        return false
    }
}

// To get file name
export async function fileName(start: string): Promise<string> {
    const files = await listDir(`images`)
    const fileValues = files.filter((element: string) => {
        _.startsWith(element, `${start}`)
    })
    if (fileValues.length === 0) throw new Error ('file does not exist' )
    return fileValues.reduce((element: string) => element)
}

// To Delete a file
export async function deleteFile(relativePath: string): Promise<void> {
    await fsPromises.rm(`${appRootPath.path}/${relativePath}`);
}

// To delete a folder 
export async function deleteFolder(relativePath: string): Promise<void> {
    const files = await listDir(relativePath);
    if (files.length > 0) {
        for (const file of files) {
            await deleteFile(`images/thumb/${file}`);
        }
    }
    const folderName = `${appRootPath.path}/${relativePath}`;
    try {
        await fsPromises.rmdir(folderName);
    } catch ({message}) {
        console.log(`Error: ${message}`);
        
    }
}

//Resizes an image according to filename, width and height constraints
export async function resizeImage(
    filename: string,
    width: number,
    height: number
): Promise<void> {
    await ensureThumbFolderExists()
    if (await exactResizeExists(filename, width, height)) return
    const imageName = await fileName(filename)
    await sharp(`${appRootPath.path}/images/${imageName}`)
        .resize({ width: width, height: height })
        .toFile(`${appRootPath.path}/images/thumb/${imageName}`)
}

// To Check if a resized image with the same dimensions exist
export async function exactResizeExists(
    filename: string,
    width: number,
    height: number
): Promise<boolean> {
    const imageName = await fileName(filename);
    try {
        const metadata = await sharp(
            `${appRootPath.path}/images/thumb/${imageName}`
        ).metadata();
        return metadata.width === width && metadata.height === height;
    } catch {
        return false
    }
}

// Create thumb folder if not exists
export async function ensureThumbFolderExists(): Promise<void> {
    if (!(await filePresent('images/thumb'))) {
        try {
            await fsPromises.mkdir(`${appRootPath.path}/images/thumb`)
        } catch ({ code, message }) {
            console.log(`mkdir result -> ${message}`)
        }
    }
}

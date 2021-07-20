import os
import re


def generateIndexFile(src):
    """
    Will generate an index.ts file that imports all the files of a given src directory
    """
    files = os.listdir(src)
    files.sort()

    def getObjName(name: str):
        # This ensures that the generated ts object will not start with a number and will not have punctuation
        return "file" + re.sub(r'[^\w\s]', '', name)

    with open('index.ts', 'w') as f:
        for file in files:
            obj = getObjName(file)
            f.write(f"import {obj} from '{src}/{file}';\n")

        f.write('\n')
        f.write(f"export const images = [\n")

        for file in files:
            obj = getObjName(file)
            f.write(f"  {obj},\n")

        f.write("];\n")


if __name__ == '__main__':
    # the image files are in ./png
    generateIndexFile('./png')

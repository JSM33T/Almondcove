import os
import shutil

def clean_bin_obj_directories(directory):
    # Clean bin and obj folders in the specified directory
    bin_path = os.path.join(directory, 'bin')
    obj_path = os.path.join(directory, 'obj')

    if os.path.exists(bin_path):
        shutil.rmtree(bin_path)
        print(f"Deleted: {bin_path}")

    if os.path.exists(obj_path):
        shutil.rmtree(obj_path)
        print(f"Deleted: {obj_path}")

def clean_dotnet_project(root_directory):
    # Clean bin and obj folders in the root directory
    clean_bin_obj_directories(root_directory)

    # Recursively clean bin and obj folders in subdirectories
    for root, dirs, files in os.walk(root_directory):
        for directory in dirs:
            if directory.lower() == 'bin' or directory.lower() == 'obj':
                directory_path = os.path.join(root, directory)
                shutil.rmtree(directory_path)
                print(f"Deleted: {directory_path}")

def run():
    current_directory = os.getcwd()
    root_directory = os.path.abspath(os.path.join(current_directory, os.pardir))

    # Clean all bin and obj folders in the dotnet project
    clean_dotnet_project(root_directory)

    print("Cleanup complete.")

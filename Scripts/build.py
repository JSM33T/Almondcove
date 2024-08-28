import os
import subprocess

def run():
    # Get the current directory
    current_directory = os.getcwd()

    # Get the parent directory path
    parent_directory = os.path.abspath(os.path.join(current_directory, os.pardir))

    # Construct the path to API/Almondcove.API directory
    target_directory = os.path.join(parent_directory, 'API', 'Almondcove.API')

    # Change the working directory to API/Almondcove.API
    os.chdir(target_directory)

    dotnet_build_command = "dotnet build -c Release -r win-x64"

    process = subprocess.Popen(dotnet_build_command, shell=True)
    process.communicate()

    print("Build process completed.")


from ftplib import FTP
import os
import logging
import sys

def setup_logging(log_file):
    # Configure logging
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

def print_progress_bar(iteration, total, prefix='', suffix='', decimals=1, length=50, fill='█'):
    percent = f"{100 * (iteration / float(total)):.{decimals}f}"
    filled_length = int(length * iteration // total)
    bar = fill * filled_length + '-' * (length - filled_length)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end='\r')
    # Print New Line on Complete
    if iteration == total: 
        print()

def upload_directory_to_ftp(ftp, local_dir, remote_dir):
    # Get the list of all files to count them
    total_files = sum([len(files) for _, _, files in os.walk(local_dir)])
    file_count = 0

    for root, dirs, files in os.walk(local_dir):
        # Calculate the relative path of the current directory
        relative_path = os.path.relpath(root, local_dir)
        ftp_dir = os.path.join(remote_dir, relative_path).replace('\\', '/')

        # Create the corresponding directory on the FTP server
        try:
            ftp.mkd(ftp_dir)
            logging.info(f"Created directory: {ftp_dir}")
        except Exception as e:
            logging.warning(f"Directory already exists: {ftp_dir}")

        # Change to the newly created directory
        ftp.cwd(ftp_dir)

        for filename in files:
            file_count += 1
            local_file_path = os.path.join(root, filename)
            try:
                # Open the local file
                with open(local_file_path, 'rb') as file:
                    # Upload the file to the FTP server
                    ftp.storbinary(f'STOR {filename}', file)
                    # Log the upload
                    logging.info(f"Uploaded: {os.path.join(relative_path, filename)}")
                    # Show progress with progress bar
                    print_progress_bar(file_count, total_files, prefix='Progress:', suffix=f'Uploaded {filename}', length=50)
            except Exception as e:
                logging.error(f"Failed to upload {filename}: {e}")

    # Change back to the root remote directory
    ftp.cwd(remote_dir)

def upload_files_to_ftp(server, username, password, local_dir, remote_dir, log_file):
    # Set up logging
    setup_logging(log_file)

    # Connect to the FTP server (plain FTP, insecure)
    ftp = FTP(server)
    ftp.login(user=username, passwd=password)

    # Upload directory recursively
    upload_directory_to_ftp(ftp, local_dir, remote_dir)

    # Close the connection to the FTP server
    ftp.quit()

# Parameters
ftp_server = 'api.almondcove.in'  # Replace with your FTP server
ftp_username = 'dummmy_username'  # Replace with your FTP username
ftp_password = 'dummy_pass'  # Replace with your FTP password
local_directory = 'C:/almondcove_megaproject/almondcove.in/Almondcove/API/Almondcove.API/bin/Release/net8.0/publish/'  # Replace with your local directory
remote_directory = '/api.almondcove.in'  # Replace with your remote directory
log_file = 'upload_log.txt'  # Replace with the desired log file path

# Call the function to upload files
upload_files_to_ftp(ftp_server, ftp_username, ftp_password, local_directory, remote_directory, log_file)

# Prevent the window from closing automatically
input("Press Enter to close the window...")

import os


def change_js_extension_to_ts(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                old_file_path = os.path.join(root, file)
                new_file_path = os.path.join(root, file[:-3] + '.ts')
                os.rename(old_file_path, new_file_path)
                print(f"Renamed {old_file_path} to {new_file_path}")


# Specify the directory where the JavaScript files are located
print("Renaming all .js files to .ts files")
print(os.getcwd())

change_js_extension_to_ts(os.getcwd())

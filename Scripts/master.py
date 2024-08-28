import cleanup
import build
import traceback

try:
    
    build.run()
    cleanup.run()

except Exception as e:
    # Log the error
    with open('error.log', 'a') as f:
        f.write(f"An error occurred: {str(e)}\n")
        traceback.print_exc(file=f)

    # Display the error in the console print window
    print(f"An error occurred: {str(e)}")
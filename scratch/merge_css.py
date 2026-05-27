import os

def main():
    globals_path = "/Users/chiragprajapati/Documents/Chota.jd/All projects/my-portfolio-chirag-zone-v2/src/app/globals.css"
    index_css_path = "/Users/chiragprajapati/Documents/Chota.jd/All projects/my-portfolio-chirag-zone-v2/scratch/index.css"

    with open(globals_path, "r") as f:
        globals_content = f.read()

    with open(index_css_path, "r") as f:
        index_content = f.read()

    # Replace relative font paths with absolute public paths
    index_content = index_content.replace("../assets/fonts/Breton.woff2", "/fonts/Breton.woff2")
    index_content = index_content.replace("../assets/fonts/Machine.otf", "/fonts/Machine.otf")
    index_content = index_content.replace("../assets/fonts/Zirena.woff2", "/fonts/Zirena.woff2")

    # Let's clean up any double body or html definitions in the merged css that might clash
    # We will append index_content at the bottom, so it overrides any prior styles cleanly.
    merged = globals_content + "\n\n/* --- Luke Baffait Reference Redesign Styles --- */\n\n" + index_content

    with open(globals_path, "w") as f:
        f.write(merged)

    print("Successfully merged CSS!")

if __name__ == "__main__":
    main()

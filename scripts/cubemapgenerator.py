import os

os.system("mkdir -p output")
for dir in os.listdir("."):
    if os.path.isfile(dir):
        continue
    os.system(f"cd {dir.replace(" ", "\\ ")}")
    os.system(
        f"cube2sphere f.jpg b.jpg r.jpg l.jpg u.jpg d.jpg --o output/{dir.replace(" ", "_")}"
    )
    os.system("cd ..")
    print(dir)

    print("\n")

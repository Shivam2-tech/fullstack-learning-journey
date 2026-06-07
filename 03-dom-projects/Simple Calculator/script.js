
const fileInput =
    document.getElementById("fileInput");

const uploadBtn =
    document.getElementById("uploadBtn");

const progressBar =
    document.getElementById("progressBar");

const message =
    document.getElementById("message");

function updateProgressBar(percent) {

    progressBar.style.width =
        percent + "%";

    progressBar.textContent =
        Math.round(percent) + "%";
}

function showMessage(text, color) {

    message.textContent = text;

    message.style.color = color;
}

async function uploadFile(file) {

    const formData = new FormData();

    formData.append("file", file);

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener(
            "progress",
            (e) => {

                if (e.lengthComputable) {

                    const percent =
                        (e.loaded / e.total) * 100;

                    updateProgressBar(percent);
                }
            }
        );

        xhr.addEventListener("load", () => {

            if (xhr.status === 200) {

                resolve(xhr.responseText);

            } else {

                reject(
                    new Error("Upload failed")
                );
            }
        });

        xhr.addEventListener("error", () => {

            reject(
                new Error("Network error")
            );
        });

        xhr.open(
            "POST",
            "https://httpbin.org/post"
        );

        xhr.send(formData);
    });
}

uploadBtn.addEventListener(
    "click",
    async () => {

        const file = fileInput.files[0];

        if (!file) {

            showMessage(
                "Please select a file",
                "red"
            );

            return;
        }

        try {

            updateProgressBar(0);

            await uploadFile(file);

            showMessage(
                "File uploaded successfully!",
                "green"
            );

        } catch (error) {

            showMessage(
                error.message,
                "red"
            );
        }
    }
);

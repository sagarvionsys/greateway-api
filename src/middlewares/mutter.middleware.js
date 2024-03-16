import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Get month (January is 0) and pad with leading zero if needed
        const yyyy = today.getFullYear(); // Get full year

        const formattedDate = dd + '-' + mm + '-' + yyyy;

        cb(null, file.fieldname + "-" + formattedDate + ".pdf")
    }
})

export const upload = multer({ storage })
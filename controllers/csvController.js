
const fs = require('fs');
const Student = require('../modals/student'); 

module.exports.downloadCsv = async function (req, res) {
  try {
    const students = await Student.find({});

    let csv = 'S.No, Name, Email, College, Placement, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result\n';

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      let data = `${i + 1},${student.batch},${student.name},${student.email},${student.college},${student.placement},${student.dsa},${student.webDev},${student.react}`;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data += `,${interview.company},${interview.date.toString()},${interview.result}`;
        }
      }

      csv += data + '\n';
    }

    const filename = 'data.csv';
    const filePath = 'report/' + filename;

    // Write the CSV content to the file
    fs.writeFileSync(filePath, csv);

    // Initiate the download using res.download
    res.download(filePath, filename, function (error) {
      // Delete the file after download
      fs.unlinkSync(filePath);

      if (error) {
        console.log(`Error in downloading file: ${error}`);
        return res.redirect('back');
      }
      console.log('File downloaded successfully');
    });
  } catch (error) {
    console.log(`Error in generating or downloading file: ${error}`);
    return res.redirect('back');
  }
};

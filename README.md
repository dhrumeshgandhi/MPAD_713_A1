# MPAD_713_A1

# Endpoints
  1) Get Students
      GET: /getStudents
  2) Add Students
      POST: /addStudents
      [
        {
          "name": "name",
          "enrollment": 12345678,
          "GPA": 4.0
        },{
          "name": "name1",
          "enrollment": 12345679,
          "GPA": 3.0
        }
      ]
  3) Delete All
      GET: /deleteStudent/all
  4) Delete by enrollment
      GET: /deleteStudent/<enrollment_id> 
      Replace <enrollment_id> with enrollment id of student
# MPAD_713_A1

# Endpoints:
  1) test : post /test 
    {
      "name": "name",
      "enrollment": 12345678,
      "GPA": 4.0
    }
  2) getStudents: get /getStudents
  3) addStudents: post /addStudents
    [
      {
        "name": "name",
        "enrollment": 12345678,
        "GPA": 4.0
      },
      {
        "name": "name2",
        "enrollment": 12345679,
        "GPA": 3.0
      },
    ]
  4) deleteAll: get /delete/all
  5) deleteByEnrollment: get /delete/enrollment_id

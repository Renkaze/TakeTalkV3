if (Meetings.find().count() === 0){


  var meetingId = Meetings.insert({
      name: "Workshop Essilor",
      status: "ongoing",
      ordres: ['ordre1', 'ordre2', 'ordre3'],
      ordreTimes: [90, 130, 268],
      password: "pass",
      _id: "test",
      //reportLink: (e.target.reportLink.value !== undefined) ? e.target.reportLink.value : ""
  });


}

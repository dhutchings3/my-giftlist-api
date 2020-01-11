function makeListsArray() {
  return [
    {
      id: 1,
      listname: 'Dees Christmas List',
      user_id: 1
    },
    {
      id: 2,
      listname: 'Mikes Christmas List',
      user_id: 2
    },
    {
    id: 3,
      listname: 'Ashs Christmas List',
      user_id: 3
    },
    {
      id: 4,
        listname: 'Stephs Christmas List',
        user_id: 4
    },
    {
      id: 5,
        listname: 'Hals Christmas List',
        user_id: 5
    },
    {
      id: 6,
        listname: 'RJs Christmas List',
        user_id: 6
    },
    {
      id: 7,
        listname: 'Pats Christmas List',
        user_id: 7
    },
  ]
}
  
function makeMaliciousList() {
  const maliciousList = {
    id: 911,
    listname: `maliciousList name`,
    user_id: 6,
  }
  const expectedList = {
    ...maliciousList,
    id: 911,
    listname: `maliciousList name`,
    user_id: 6,
  }
  return {
    maliciousList,
    expectedList,
  }
}
  
module.exports = {
  makeListsArray,
  makeMaliciousList,
}
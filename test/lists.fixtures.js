function makeListsArray() {
  return [
    {
      id: 1,
      listcode: '111',
      listname: 'Dees Christmas List',
      user_id: 1
    },
    {
      id: 2,
      listcode: '222',
      listname: 'Mikes Christmas List',
      user_id: 2
    },
    {
    id: 3,
      listcode: '333',
      listname: 'Ashs Christmas List',
      user_id: 3
    },
    {
      id: 4,
        listcode: '444',
        listname: 'Stephs Christmas List',
        user_id: 4
    },
    {
      id: 5,
        listcode: '555',
        listname: 'Hals Christmas List',
        user_id: 5
    },
    {
      id: 6,
        listcode: '666',
        listname: 'RJs Christmas List',
        user_id: 6
    },
    {
      id: 7,
        listcode: '777',
        listname: 'Pats Christmas List',
        user_id: 7
    },
  ]
}
  
function makeMaliciousList() {
  const maliciousList = {
    id: 911,
    listname: `maliciousList name`,
    listcode: `Bad listcode`,
    user_id: 6,
  }
  const expectedList = {
    ...maliciousList,
    id: 911,
    listname: `maliciousList name`,
    listcode: `Bad listcode`,
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
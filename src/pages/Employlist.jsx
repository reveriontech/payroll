import React from 'react'
import '../styles/pages/_employlist.scss'

const Employlist = () => {
   
  const employList = [
    {
      id: 1,
      name: 'John Doe',
      basicSalary: '40000',
      TIN: '1234567890',
      sss: '1000',
    },
    {
      id: 2,
      name: 'Jane Doe',
      basicSalary: '40000',
      TIN: '1234567890',
      sss: '1000',
    },
  ]
  
  const handleRowClick = (employ) => {
    console.log('Selected employee:', employ);
    // Add your row click handling logic here
  };

  return (
      <section>
        <div className='employ-list-container'>
          <h1>EMPLOYMENT LIST</h1>

          {/* This part is for table */}
          <div className='employ-table-container'>
            <table className='employ-table'>
              <thead>
                <tr className='employ-table-header'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Basic Salary</th>
                  <th>TIN</th>
                  <th>SSS</th>
                </tr>
              </thead>
              <tbody>
                {employList.map((employ) => (
                  <tr 
                    className='employ-table-row' 
                    key={employ.id}
                    onClick={() => handleRowClick(employ)}
                  >
                    <td>{employ.id}</td>
                    <td>{employ.name}</td>
                    <td>{employ.basicSalary}</td>
                    <td>{employ.TIN}</td>
                    <td>{employ.sss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>
  )
}

export default Employlist
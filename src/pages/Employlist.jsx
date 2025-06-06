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
  
  return (
    <section>
      <div className='employ-list-container'>
        <h1>EMPLOYMENT LIST</h1>

          <div className='employ-list-item-container'>
              {employList.map((employ) => (
                      <div className='employ-list-item' key={employ.id}>
                          <ul className='employ-list'>
                              <li>ID: {employ.id}</li>
                              <li>Name: {employ.name}</li>
                              <li>Basic Salary: {employ.basicSalary}</li>
                              <li>TIN: {employ.TIN}</li>
                              <li>SSS: {employ.sss}</li>
                          </ul>
                      </div>
                  ))}
            </div>
       </div>
      
    </section>

  )
}

export default Employlist
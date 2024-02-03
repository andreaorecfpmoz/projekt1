import React, {useEffect, useState} from 'react'
import './addTable.css'


export default function AddTable(props) {
    const [table, setTables] = useState([]);
    const [tableTitle, setTableTitle] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState(0);

  
    const addTable = (e) => {
      e.preventDefault();
      setTables([...table, { ImeStola: tableTitle, BrojStolica: numberOfSeats }]);
      props.backFromTableMenagment([...table, { ImeStola: tableTitle, BrojStolica: numberOfSeats, IDStola: props.table?.IDStola }])
      setTableTitle('');
      setNumberOfSeats(0);
    };

    useEffect(()=> {
        if(props.table) {
            setTableTitle(props.table.ImeStola)
            setNumberOfSeats(props.table.BrojStolica)
        }
    },[props])

    return (
        <div className="addTableContainer">
          <form >
            <div className="mb-3">
              <label htmlFor="tableTitle" className="form-label">Ime stola</label>
              <input
                type="text"
                className="form-control addTableInput"
                id="tableTitle"
                placeholder="Enter table title"
                value={tableTitle}
                onChange={(e) => setTableTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfSeats" className="form-label">Broj stolica</label>
              <input
                type="number"
                className="form-control addTableInput"
                id="numberOfSeats"
                placeholder="Enter number of seats"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn addTableSubmitBtn" onClick={addTable}>{props.table ? 'Uredi ' : 'Dodaj '} Stol</button>
            <button type="button" className="btn goBackSubmitBtn" onClick={props.backFromTableMenagment}>Nazad</button>
          </form>
        </div>
      );
    
    
}

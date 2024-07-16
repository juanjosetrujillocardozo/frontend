import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cars.css';
import addIcon from '../assets/Icon_crear.svg';
import carIcon from '../assets/Icon_vehiculo.svg';
import locationIcon from '../assets/Icon_puntoubicacion.svg';
import personIcon from '../assets/Icon_persona.svg';
import deleteIcon from '../assets/Icon_eliminar1.svg';
import editIcon from '../assets/Icon_editar1.svg';
import editIconDisabled from '../assets/Icon_editar.svg';
import deleteIconDisabled from '../assets/Icon_eliminar.svg';
import logo from '../assets/Imagologotipo_motion.svg';
import cancelEditIcon from '../assets/Icon_cancelar.svg';
import confirmEditIcon from '../assets/Icon_confirmar.svg';
import carIconColored from '../assets/Icon_vehiculo1.svg';
import locationIconColored from '../assets/Icon_puntoubicacion1.svg';
import personIconColored from '../assets/Icon_persona1.svg';
import leftArrow from '../assets/Flecha izquierda.png';

function Cars() {
  const [marca, setMarca] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [aspirante, setAspirante] = useState('');
  const [cars, setCars] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [deletingCar, setDeletingCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://frontend-jade-iota.vercel.app/cars')
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCar = { marca, sucursal, aspirante };
    axios.post('https://frontend-jade-iota.vercel.app/cars', newCar)
      .then(response => {
        setCars([...cars, response.data]);
        setMarca('');
        setSucursal('');
        setAspirante('');
        setFormVisible(false);
      })
      .catch(error => console.error('Error creating car:', error));
  };

  const handleDelete = (id) => {
    const car = cars.find(car => car.id === id);
    if (car) {
      setDeletingCar(car);
      setTimeout(() => {
        axios.delete(`https://frontend-jade-iota.vercel.app/cars/${id}`)
          .then(() => {
            setCars(cars.filter(car => car.id !== id));
            setMarca(car.marca);
            setSucursal(car.sucursal);
            setAspirante(car.aspirante);
            setFormVisible(true);
            setDeletingCar(null);
          })
          .catch(error => console.error('Error deleting car:', error));
      }, 1000);
    }
  };

  const handleEdit = (id) => {
    const car = cars.find(car => car.id === id);
    if (car) {
      setMarca(car.marca);
      setSucursal(car.sucursal);
      setAspirante(car.aspirante);
      setIsEditing(true);
      setEditingId(id);
      setFormVisible(true);
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedCar = { marca, sucursal, aspirante };
    axios.put(`https://frontend-jade-iota.vercel.app/cars/${editingId}`, updatedCar)
      .then(response => {
        setCars(cars.map(car => (car.id === editingId ? response.data : car)));
        setMarca('');
        setSucursal('');
        setAspirante('');
        setIsEditing(false);
        setEditingId(null);
        setFormVisible(false);
      })
      .catch(error => console.error('Error updating car:', error));
  };

  const handleCancelEdit = () => {
    setMarca('');
    setSucursal('');
    setAspirante('');
    setIsEditing(false);
    setEditingId(null);
    setFormVisible(false);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setMarca('');
    setSucursal('');
    setAspirante('');
    setFormVisible(true);
  };

  const handleCancelClick = () => {
    setFormVisible(false);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="main-container">
      {showContent && (
        <>
          <div className="cars-container">
            <form className={`car-form ${formVisible ? 'visible' : ''}`} onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
              <div className="input-group">
                <img src={addIcon} alt="Add Icon" className="input-icon add-icon" onClick={handleAddClick} />
                <div className="input-items">
                  <div className="input-item">
                    <img src={formVisible || isEditing ? carIconColored : carIcon} alt="Car Icon" className="input-icon-inner" />
                    <input
                      type="text"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                      placeholder="Mazda"
                      required
                      disabled={!formVisible && !isEditing}
                    />
                  </div>
                  <div className="input-item">
                    <img src={formVisible || isEditing ? locationIconColored : locationIcon} alt="Location Icon" className="input-icon-inner" />
                    <input
                      type="text"
                      value={sucursal}
                      onChange={(e) => setSucursal(e.target.value)}
                      placeholder="Chapinero"
                      required
                      disabled={!formVisible && !isEditing}
                    />
                  </div>
                  <div className="input-item">
                    <img src={formVisible || isEditing ? personIconColored : personIcon} alt="Person Icon" className="input-icon-inner" />
                    <input
                      type="text"
                      value={aspirante}
                      onChange={(e) => setAspirante(e.target.value)}
                      placeholder="David Sandoval"
                      required
                      disabled={!formVisible && !isEditing}
                    />
                  </div>
                </div>
              </div>
              {formVisible && !isEditing && (
                <div className="form-buttons">
                  <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancelar</button>
                  <button type="submit" className="create-button">Crear</button>
                </div>
              )}
              {isEditing && (
                <div className="form-buttons">
                  <img src={cancelEditIcon} alt="Cancel Edit" className="action-icon" onClick={handleCancelEdit} />
                  <img src={confirmEditIcon} alt="Confirm Edit" className="action-icon" onClick={handleEditSubmit} />
                </div>
              )}
            </form>
            <table className="cars-table">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Sucursal</th>
                  <th className="aspirante-header">Aspirante</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} className={`${isEditing && car.id !== editingId ? 'disabled' : ''} ${deletingCar && deletingCar.id === car.id ? 'deleting' : ''}`}>
                    <td>{car.marca}</td>
                    <td>{car.sucursal}</td>
                    <td className="actions aspirante-column">
                      {car.aspirante}
                      <img src={isEditing && car.id !== editingId ? editIconDisabled : editIcon} alt="Edit" className="action-icon" onClick={() => handleEdit(car.id)} />
                      <img src={isEditing && car.id !== editingId ? deleteIconDisabled : deleteIcon} alt="Delete" className="action-icon" onClick={() => handleDelete(car.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="page-logo" />
          </div>
        </>
      )}
      {!showContent && (
        <div className="loading-container">
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <div className="navigation-arrow left-arrow" onClick={handleGoToHome}>
        <img src={leftArrow} alt="Back" />
      </div>
    </div>
  );
}

export default Cars;
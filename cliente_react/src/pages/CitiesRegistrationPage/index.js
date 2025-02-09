import { useContext } from 'react';
import { useNavigate } from 'react-router'

import { AuthContext } from '../../store/contexts';

const CitiesRegistrationPage = () => {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = handleGetFormData();
    const Authorization = "Bearer " + Auth.currentUser.token;

    try {
      const response = await fetch("/api/cities", {
        method: "POST",
        headers: {
          Authorization,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      debugger

      if (response.status === 200) {
        const data = await response.json();
        navigate("/cities");
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleGetFormData = () => {
    const newCityFormElement = document.getElementById("newCityForm");
    const newCityFormData = new FormData(newCityFormElement);
    const newCityData = [...newCityFormData.entries()].reduce((acc, cur) => {
      return { ...acc, [cur[0]]: cur[1] };
    }, {});

    return newCityData;
  }

  return (
    <div className="container d-flex flex-column login-form-container">
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col card">
          <form className="card-body" id="newCityForm" onSubmit={handleFormSubmit}>
            <h1 className="card-title text-center mb-2">
              Nova Cidade
            </h1>

            <div class="form-group mb-2">
              <label for="emailInput">Nome</label>
              <input
                name="name"
                id="nameInput"
                placeholder="Nome da Cidade"
                class="form-control"
              />
            </div>

            <div class="form-group mb-2">
              <label for="emailInput">País</label>
              <input
                name="country"
                id="countryInput"
                class="form-control"
                placeholder="País da Cidade"
              />
            </div>

            <div class="form-group mb-2">
              <label for="emailInput">Latitude</label>
              <input
                name="latitude"
                id="latitudeInput"
                class="form-control"
                placeholder="Latitude"
              />
            </div>

            <div class="form-group mb-2">
              <label for="emailInput">Longitude</label>
              <input
                name="longitude"
                id="longitudeInput"
                class="form-control"
                placeholder="Longitude"
              />
            </div>

            <div class="form-group mb-2">
              <label for="emailInput">População</label>
              <input
                name="population"
                id="populationInput"
                class="form-control"
                placeholder="População da Cidade"
              />
            </div>


            <button type="submit" class="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default CitiesRegistrationPage;

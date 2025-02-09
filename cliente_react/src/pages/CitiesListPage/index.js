import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../store/contexts";
import { NavLink } from "react-router";

const CitiesListPage = () => {
  const Auth = useContext(AuthContext)

  const [cities, setCities] = useState();
  const [filteredCities, setFilteredCities] = useState();
  const [cityNameFilter, setCityNameFilter] = useState('');

  useEffect(() => {
    if (!cityNameFilter) {
      setFilteredCities(undefined)
      return
    }

    const filteredCities = (cities || []).filter((city) => {
      const nameFlag = city.name.toLocaleLowerCase().includes(cityNameFilter.toLocaleLowerCase())
      const countryFlag = city.country.toLocaleLowerCase().includes(cityNameFilter.toLocaleLowerCase())

      return nameFlag || countryFlag;
    });
    setFilteredCities(filteredCities);
  }, [cityNameFilter])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const Authorization = "Bearer " + Auth.currentUser.token;

        const response = await fetch("/api/cities", {
          method: "GET",
          headers: {
            Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error(error);
      }
    }

    if (Auth.currentUser) {
      fetchCities();
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col col-10">
          <h1>Cidades</h1>
        </div>
        <div className="col">
          <NavLink className="btn btn-secondary" to="/cities/new">
            Nova Cidade
          </NavLink>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h4>Filtros</h4>

          <div class="col form-group mb-2">
            <label for="cityName">Pesquise a Cidade ou o País</label>
            <input
              type="text"
              id="cityName"
              placeholder="Nome da Cidade ou País"
              className="form-control mt-2"
              onChange={evt => setCityNameFilter(evt.target.value)}
            />
          </div>
        </div>
        {/* <div className="col">
          <input
            type="button"
            title="Pesquisar"
            className="form-control"
          />
        </div> */}
      </div>

      <div className="row mt-3">
        <table className="table table-striped cities-list-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">País</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">População</th>
            </tr>
          </thead>
          <tbody>
            {(filteredCities || cities || []).map((city) => (
              <tr>
                <th scope="row">{city?.id}</th>
                <td>{city?.name}</td>
                <td>{city?.country}</td>
                <td>{city?.latitude}</td>
                <td>{city?.longitude}</td>
                <td>{city?.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CitiesListPage;

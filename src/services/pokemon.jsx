import React, { useState, useEffect } from "react";
import "../Sass/Pokemon.scss";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 16;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        const offset = page * limit;
        // 1. Obtener lista básica
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok)
          throw new Error("Error al obtener la lista de Pokémon");
        const data = await response.json();

        // 2. Obtener detalles de cada Pokémon (nombre, habilidades, imagen...)
        const detailedPromises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        });

        const detailedPokemon = await Promise.all(detailedPromises);
        setPokemonList(detailedPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, [page]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  if (loading) return <p className="">Cargando Pokémon...</p>;
  if (error) return <p className="">Error: {error}</p>;

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return (
    <>
      <div className="container-title">
        <div className="cont">
          <h1 className="title-menu">
            No te pierdas la oportunidad de tener Pokemones en tus manos
          </h1>
        </div>
      </div>
      <div className="container">
        {pokemonList.map((pokemon) => (
          <div
            className="list-pokemon"
            key={pokemon.id}
            style={{
              backgroundColor: typeColors[pokemon.types[0].type.name] || "#ccc",
            }}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="poke-img"
            />

            <div className="container-habilities">
              <h4 className="title-pokemon">{pokemon.name.toUpperCase()}</h4>
              <h4>Habilidades:</h4>
              <ul className="poke-hab">
                {pokemon.abilities.map((item, index) => (
                  <li key={index}>{item.ability.name}</li>
                ))}
              </ul>
            </div>
            <h3 className="id-pokemon">{pokemon.id}</h3>
          </div>
        ))}
        <div className="container-button-controller">
          <button className="btn" onClick={prevPage} disabled={page === 0}>
            Anterior
          </button>
          <span className="number-page" style={{ margin: "0 18px" }}>
            Página {page + 1}
          </span>
          <button className="btn" onClick={nextPage}>
            Siguiente
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Pokemon;

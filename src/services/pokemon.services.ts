import { currentEnpoint } from "@/constants";
import { loadAbort } from "@/tools/tools";
import axios from "axios";

export const getAllPokemons = ({
  limit = null,
  page = null,
  search = null,
}: {
  limit: null | number;
  page: null | number;
  search: null | string;
}) => {
  const controller = loadAbort();

  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append("limit", String(limit));
  }

  if (page) {
    queryParams.append("page", String(page));
  }

  if (search) {
    queryParams.append("search", search);
  }

  const queryString = queryParams.toString();
  const url = `${currentEnpoint}pokemon/pokedex/all${
    queryString && `?${queryString}`
  }`;

  return {
    call: axios.get(url, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getOnePokemon = (id: string) => {
  const controller = loadAbort();
  return {
    call: axios.get(`${currentEnpoint}pokemon/pokedex/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPokemon = () => {
  const controller = loadAbort();
  return {
    call: axios.get(`${currentEnpoint}pokemon`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPokemonById = (id: string) => {
  const controller = loadAbort();
  return {
    call: axios.get(`${currentEnpoint}pokemon/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createPokemon = (pokemonData: {
  name: string;
  description: string;
}) => {
  const controller = loadAbort();
  return {
    call: axios.post(`${currentEnpoint}pokemon`, pokemonData, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const updatedServicesPokemon = (
  id: string,
  pokemonData: {
    description: string;
  }
) => {
  const controller = loadAbort();
  return {
    call: axios.patch(`${currentEnpoint}pokemon/${id}`, pokemonData, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deletedPokemon = (id: string) => {
  const controller = loadAbort();
  return {
    call: axios.delete(`${currentEnpoint}pokemon/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

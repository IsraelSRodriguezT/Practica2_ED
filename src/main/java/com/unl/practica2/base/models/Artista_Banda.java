package com.unl.practica2.base.models;

public class Artista_Banda {
    private Integer id;
	private RolArtistaEnum rol;
	private Integer idArtista;
	private Integer idBanda;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public RolArtistaEnum getRol() {
		return this.rol;
	}

	public void setRol(RolArtistaEnum rol) {
		this.rol = rol;
	}

	public Integer getIdArtista() {
		return this.idArtista;
	}

	public void setIdArtista(Integer idArtista) {
		this.idArtista = idArtista;
	}

	public Integer getIdBanda() {
		return this.idBanda;
	}

	public void setIdBanda(Integer idBanda) {
		this.idBanda = idBanda;
	}


}

package com.sample.SpringBootAngular.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sample.SpringBootAngular.bean.Furniture;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class FurnitureDAOImpl implements FurnitureDAO{

	EntityManager entityManager;
	
	public FurnitureDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override
	public List<Furniture> getAllFurniture() {
		TypedQuery<Furniture> query = entityManager.createQuery("SELECT f FROM Furniture f", Furniture.class);
		List<Furniture> furnitures = query.getResultList();
		return furnitures;
	}

	@Override
	public Furniture getFurnitureById(int id) {
		Furniture furniture = entityManager.find(Furniture.class, id);
		return furniture;
	}

	@Override
	public Furniture save(Furniture furniture) {
		Furniture f = entityManager.merge(furniture);
		return f;
	}

	@Override
	public void deleteFurnitureById(int id) {
		Furniture furniture = entityManager.find(Furniture.class, id);
		entityManager.remove(furniture);
	}

}

package com.sample.SpringBootAngular.dao;

import java.util.List;

import com.sample.SpringBootAngular.bean.Furniture;

public interface FurnitureDAO {

	public List<Furniture> getAllFurniture();
	
	public Furniture getFurnitureById(int id);
	
	public Furniture save(Furniture furniture);
	
	void deleteFurnitureById(int id);
}

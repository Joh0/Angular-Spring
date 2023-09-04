package com.sample.SpringBootAngular.service;

import java.util.List;

import com.sample.SpringBootAngular.bean.Furniture;

public interface FurnitureService {
	
	public List<Furniture> getAllFurniture();
	
	public Furniture getFurnitureById(int id);
	
	public Furniture save(Furniture furniture);
	
	void deleteFurnitureById(int id);
}

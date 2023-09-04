package com.sample.SpringBootAngular.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sample.SpringBootAngular.bean.Furniture;
import com.sample.SpringBootAngular.dao.FurnitureDAO;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FurnitureServiceImpl implements FurnitureService {

	FurnitureDAO furnitureDAO;

	public FurnitureServiceImpl(FurnitureDAO furnitureDAO) {
		super();
		this.furnitureDAO = furnitureDAO;
	}

	@Override
	public List<Furniture> getAllFurniture() {
		return furnitureDAO.getAllFurniture();
	}

	@Override
	public Furniture getFurnitureById(int id) {
		return furnitureDAO.getFurnitureById(id);
	}

	@Override
	public Furniture save(Furniture furniture) {
		return furnitureDAO.save(furniture);
	}

	@Override
	public void deleteFurnitureById(int id) {
		furnitureDAO.deleteFurnitureById(id);
	}

}

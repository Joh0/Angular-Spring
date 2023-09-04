package com.sample.SpringBootAngular.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.SpringBootAngular.bean.Furniture;
import com.sample.SpringBootAngular.service.FurnitureService;

@RestController
@RequestMapping("/api")
public class SpringBootAngularController {

	FurnitureService furnitureService;
	
	public SpringBootAngularController(FurnitureService furnitureService) {
		super();
		this.furnitureService = furnitureService;
	}
	
	@GetMapping("/login")
	public String login(){
		return "You have successfully logged in!";
	}
	
	@GetMapping("/furnitures")
	public List<Furniture> getAllFurnitures(){
		return furnitureService.getAllFurniture();
	}
	
	@GetMapping("/furnitures/{furnitureId}")
	public Furniture getFurnitureById(@PathVariable int furnitureId) {
		Furniture furniture = furnitureService.getFurnitureById(furnitureId);
		return furniture;
	}
	
	@PostMapping("/furnitures")
	public Furniture addFurniture(@RequestBody Furniture furniture) {
		furniture.setId(0);
		Furniture f = furnitureService.save(furniture);
		return f;
	}
	
	@PutMapping("/furnitures")
	public Furniture updateFurniture(@RequestBody Furniture furniture) {
		Furniture f = furnitureService.save(furniture);
		return f;
	}
	
	@DeleteMapping("/furnitures/{furnitureId}")
	public Furniture deleteFurniture(@PathVariable int furnitureId) {
		Furniture furniture = furnitureService.getFurnitureById(furnitureId);
		if(furniture == null) {
			throw new RuntimeException("Furniture id not found: " + furnitureId);
		}
		furnitureService.deleteFurnitureById(furnitureId);
		return furniture;
	}
	
//  Returning String or void is not as ideal for Delete if we wish to display the Furniture being
//  deleted in Angular afterwards.
	
//	@DeleteMapping("/furnitures/{furnitureId}")
//	public String deleteFurniture(@PathVariable int furnitureId) {
//		Furniture furniture = furnitureService.getFurnitureById(furnitureId);
//		if(furniture == null) {
//			throw new RuntimeException("Furniture id not found: " + furnitureId);
//		}
//		furnitureService.deleteFurnitureById(furnitureId);
//		return "Deleted furniture id - " + furnitureId;
//	}
	
//	@DeleteMapping("/furnitures/{furnitureId}")
//	public void deleteFurniture(@PathVariable int furnitureId) {
//		Furniture furniture = furnitureService.getFurnitureById(furnitureId);
//		if(furniture == null) {
//			throw new RuntimeException("Furniture id not found: " + furnitureId);
//		}
//		furnitureService.deleteFurnitureById(furnitureId);
//	}
	
}

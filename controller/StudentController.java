package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Student;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class StudentController {
	@Autowired
	private StudentService stuService;
	@GetMapping("/Students")
	public List<Student> getAllStudents(){
		return stuService.findAll();
	}
	@GetMapping("/Students/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable(value="id") Long StudentId) 
			throws ResourceNotFoundException{
		Student student = stuService.findById(StudentId);
		return ResponseEntity.ok().body(student);
	}
	@PostMapping("/Students")
	public void createStudent(@Valid @RequestBody Student student) {
		stuService.add(student);
	}
	@PutMapping("/Students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable(value="id") Long studentId, 
			@Valid @RequestBody Student studentDetails) throws ResourceNotFoundException {
		Student student =stuService.findById(studentId);
		student.setEmailId(studentDetails.getEmailId());
		student.setLastName(studentDetails.getLastName());
		student.setFirstName(studentDetails.getFirstName());
		stuService.update(studentId.intValue(), student);
		return ResponseEntity.ok(student);
	}
	@DeleteMapping("/Students/{id}")
	public Map<String, Boolean> deleteStudent(@PathVariable(value="id") Long studentId) 
			throws ResourceNotFoundException{
		stuService.remove(studentId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return response;
		
	}
	
	
	
	
	
	
	
}

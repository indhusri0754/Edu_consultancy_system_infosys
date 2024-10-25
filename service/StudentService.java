package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Student;

public interface StudentService {
	public Student findById(long id);
	public void remove(long id);
	public void add(Student emp);
	public void update(int id, Student stu);
	public List<Student> findAll();

}

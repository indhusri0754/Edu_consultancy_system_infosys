package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.Student;

public interface StudentDao {
	public Student findById(long id);
	public void remove(long id);
	public void add(Student stu);
	public void update(int id, Student stu);
	public List<Student> findAll();

}

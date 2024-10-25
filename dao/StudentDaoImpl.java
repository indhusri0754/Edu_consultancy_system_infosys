package com.example.demo.dao;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;

@Repository
public class StudentDaoImpl implements StudentDao{
	private static final Logger logger = LoggerFactory.getLogger(StudentDaoImpl.class);
	@Autowired
	private StudentRepository stuRepository;

	@Override
	public Student findById(long id) {
		try {
			Student stu=stuRepository.findById(id).get();
			return stu;
		}
		catch(Exception e) {
			logger.error(e.getMessage(),e);
		}
		return null;
	}

	@Override
	public void remove(long id) {
		try {
			Student stu = new Student(id, null, null, null);
			stu.setId(id);
			stuRepository.delete(stu);
			
		}
		catch(Exception e) {
			logger.error(e.getMessage(),e);
		}
		
		
	}

	@Override
	public void add(Student stu) {
		try {
			stuRepository.save(stu);
		}
		catch(Exception e) {
			logger.error(e.getMessage(),e);
		}
		
	}

	@Override
	public void update(int id, Student stu) {
		try {
			stu.setId(id);
			stuRepository.save(stu);
		}
		catch(Exception e) {
			logger.error(e.getMessage(),e);
		}
		
	}

	@Override
	public List<Student> findAll() {
		try {
			return stuRepository.findAll();
		}
		catch(Exception e) {
			logger.error(e.getMessage(),e);
		}
		
		return null;
	}
	

}

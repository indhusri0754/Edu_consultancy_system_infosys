package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.StudentDao;
import com.example.demo.entity.Student;

@Service
public class StudentServiceImpl implements StudentService{
	@Autowired
	private StudentDao stuDao;

	@Override
	public Student findById(long id) {
		if(id<=0) {
			throw new IllegalArgumentException("Id cannot be 0 or <0");
		}
		return stuDao.findById(id);
	}

	@Override
	public void remove(long id) {
		if(id<=0) {
			throw new IllegalArgumentException("Id cannot be 0 or <0");
		}
		
		stuDao.remove(id);
	}

	@Override
	public void add(Student stu) {
		if(stu == null) {
			throw new IllegalArgumentException("The passed object cannot be null");
		}
		stuDao.add(stu);	
	}

	@Override
	public void update(int id, Student stu) {
		if(stu == null) {
			throw new IllegalArgumentException("The passed object cannot be null");
		}
		stuDao.update(id, stu);
	}

	@Override
	public List<Student> findAll() {
		List<Student> stu = stuDao.findAll();
		if(stu.size()>0) {
			return stu;
		}
		return null;
	}
	
	
}

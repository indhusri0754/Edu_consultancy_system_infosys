package com.example.demo.entity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.*;
@Entity
@Table(name="students")
public class Student {
	private static final Logger logger = LoggerFactory.getLogger(Student.class);

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name ="First")
	private long id;
	@Column(name ="First_name",nullable = false)
	private String firstName;
	@Column(name ="Last_name",nullable = false)
	private String lastName;
	@Column(name ="Email_id",nullable = false)
	private String emailId;
	public Student() {
		
	}
	public Student(long id, String firstName, String lastName, String emailId) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + emailId
				+ "]";
	}
	public static Logger getLogger() {
		return logger;
	}
	
}

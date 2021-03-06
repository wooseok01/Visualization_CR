package com.ajou.visualization.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.ajou.visualization.mapper.AllDaoInterface;
import com.ajou.visualization.model.Consult;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Description;
import com.ajou.visualization.model.Patient;
import com.ajou.visualization.model.SimilarityPerson;

public class AllDao {
	private JdbcTemplate template;
	private SqlSession sqlSession;
	
	public AllDao(){}

	public AllDao(JdbcTemplate template, SqlSession sqlSession) {
		super();
		this.template = template;
		this.sqlSession = sqlSession;
	}

	@Autowired
	public void setTemplate(JdbcTemplate template) {this.template = template;}
	public JdbcTemplate getTemplate() {return template;}

	@Autowired
	public void setSqlSession(SqlSession sqlSession) {this.sqlSession = sqlSession;}
	public SqlSession getSqlSession() {return sqlSession;}

	public ArrayList<Consult> getCredosData(int number) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("number", number);
		return sqlSession.getMapper(AllDaoInterface.class).getCredosData(map);
	}

	public ArrayList<Consult2> getCredosData2() {
		return sqlSession.getMapper(AllDaoInterface.class).getCredosData2();
	}

	public ArrayList<String> getPatientName() {
		return sqlSession.getMapper(AllDaoInterface.class).getPatientName();
	}

	public ArrayList<Consult2> getMeaningValue(String value) {
		return sqlSession.getMapper(AllDaoInterface.class).getMeaningValue(value);
	}

	public ArrayList<Description> getDescription() {
		return sqlSession.getMapper(AllDaoInterface.class).getDescription();
	}

	public ArrayList<Patient> getCredosData3() {
		return sqlSession.getMapper(AllDaoInterface.class).getCredosData3();
	}

	public ArrayList<String> getPatientName2() {
		// TODO Auto-generated method stub
		return sqlSession.getMapper(AllDaoInterface.class).getPatientName2();
	}

	public ArrayList<SimilarityPerson> getSimilarityPerson() {
		return sqlSession.getMapper(AllDaoInterface.class).getSimilarityPerson();
	}

	public ArrayList<String> getSimilarityColumn() {
		return sqlSession.getMapper(AllDaoInterface.class).getSimilarityColumn();
	}

	public ArrayList<String> getCredosQuestions() {
		return sqlSession.getMapper(AllDaoInterface.class).getCredosQuestions();
	}
	
	
}

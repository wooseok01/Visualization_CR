package com.ajou.visualization.action;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.ajou.visualization.dao.AllDao;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Patient;

public class GetCredosData3 {
	private AllDao dao;
	public GetCredosData3(){}
	public GetCredosData3(AllDao dao){
		this.dao = dao;
	}
	
	@Autowired
	public void setDao(AllDao dao) {this.dao = dao;}
	public AllDao getDao() {return dao;}
	
	public ArrayList<Patient> getCredosData(){
		ArrayList<Patient> consultList = null;
		consultList = dao.getCredosData3();
		
		return consultList;
	}
	public ArrayList<String> getPatientName() {
		return dao.getPatientName2();
	}
	
}

package com.ajou.visualization.action;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.ajou.visualization.dao.AllDao;
import com.ajou.visualization.model.Consult;

public class GetCredosData {
	private AllDao dao;
	
	public GetCredosData(){}

	public GetCredosData(AllDao dao) {
		super();
		this.dao = dao;
	}

	@Autowired
	public void setDao(AllDao dao) {this.dao = dao;}
	public AllDao getDao() {return dao;}
	
	public ArrayList<Consult> getCredosData(int number){
		ArrayList<Consult> consultList = new ArrayList<Consult>();
		
		consultList = dao.getCredosData(number);
		
		return consultList;
	}
	
}

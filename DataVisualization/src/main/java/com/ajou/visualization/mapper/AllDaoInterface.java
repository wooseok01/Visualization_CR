package com.ajou.visualization.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import com.ajou.visualization.model.Consult;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Description;

public interface AllDaoInterface {
	public ArrayList<Consult> getCredosData(HashMap<String, Integer> map);
	public ArrayList<Consult2> getCredosData2();
	public ArrayList<String> getPatientName();
	public ArrayList<Consult2> getMeaningValue(String value);
	public ArrayList<Description> getDescription();

}

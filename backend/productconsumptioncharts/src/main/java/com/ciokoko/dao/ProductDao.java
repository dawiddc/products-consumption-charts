package com.ciokoko.dao;

import com.ciokoko.model.Group;

import java.util.Map;

public interface ProductDao {
    Map<String, Group> getGroups(String group);
}
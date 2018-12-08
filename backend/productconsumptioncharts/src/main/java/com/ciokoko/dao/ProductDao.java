package com.ciokoko.dao;

import com.ciokoko.model.Group;
import com.ciokoko.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductDao {
    Map<String, Group> getGroups();
}
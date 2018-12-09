package com.ciokoko.dao;

import com.ciokoko.model.Group;

import java.util.List;
import java.util.Map;

public interface ProductDao {
    Map<String, Group> getGroups(List<String> requestedGroups);
}
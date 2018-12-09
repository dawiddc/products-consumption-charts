package com.ciokoko.dao;

import com.ciokoko.model.Group;
import com.ciokoko.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductDaoImpl implements ProductDao {

    private Iterable<CSVRecord> records;

    @Override
    public Map<String, Group> getGroups(List<String> requestedGroups) {
        Map<String, Group> allGroups = new HashMap<>();
        try (Reader in = new FileReader(new ClassPathResource("products-consumption.csv").getFile())) {
            records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(in);
            for (CSVRecord record : records) {
                final Product product = buildProduct(record);
                String unit = record.get("unit");
                allGroups.computeIfAbsent(unit, k -> new Group(new ArrayList<>()))
                        .getProducts().add(product);
            }
        } catch (IOException e) {
            log.error("Error reading file!");
        }
        allGroups = filterGroups(allGroups, requestedGroups);
        return allGroups;
    }

    private Map<String, Group> filterGroups(Map<String, Group> allGroups, List<String> requestedGroups) {
        if (requestedGroups != null && !requestedGroups.isEmpty()) {
            return allGroups.entrySet()
                    .stream()
                    .filter(e -> requestedGroups.contains(e.getKey()))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        } else
            return allGroups;
    }

    private Product buildProduct(CSVRecord record) {
        return Product.builder()
                .name(record.get("product"))
                .valuesPerYear(buildValuesPerYear(record))
                .build();
    }

    private Map<Integer, Double> buildValuesPerYear(CSVRecord record) {
        Map<Integer, Double> valuesPerYear = new HashMap<>();
        for (int i = 2; i < record.size(); i++) {
            Integer year = 0;
            for (Map.Entry<String, Integer> entry : ((CSVParser) records).getHeaderMap().entrySet()) {
                if (entry.getValue() == i) {
                    year = Integer.valueOf(entry.getKey());
                }
            }
            valuesPerYear.put(year, Double.valueOf(record.get(i)));
        }
        return valuesPerYear;
    }
}
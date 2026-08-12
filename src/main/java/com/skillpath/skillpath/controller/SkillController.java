package com.skillpath.skillpath.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Session;
import org.neo4j.driver.Values;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SkillController {

    private final Driver driver;

    public SkillController(Driver driver) {
        this.driver = driver;
    }
    @GetMapping("/")
    public void home(jakarta.servlet.http.HttpServletResponse response)
            throws java.io.IOException {
        response.sendRedirect("/index.html");
    }
    @GetMapping("/api/skills")
    public List<String> getSkills() {

        List<String> skills = new ArrayList<>();

        try (Session session = driver.session()) {

            var result = session.run(
                    "MATCH (s:Skill) RETURN s.name AS name ORDER BY name"
            );

            while (result.hasNext()) {
                Record record = result.next();
                skills.add(record.get("name").asString());
            }
        }

        return skills;
    }
    @GetMapping("/api/targets")
    public List<String> getTargets() {

        List<String> targets = new ArrayList<>();

        try (Session session = driver.session()) {

            var result = session.run(
                    "MATCH (r:JobRole) RETURN r.name AS name ORDER BY name"
            );

            while (result.hasNext()) {
                Record record = result.next();
                targets.add(record.get("name").asString());
            }
        }

        return targets;
    }

    @GetMapping("/api/path")
    public List<Map<String, Object>> findPath(
            @RequestParam String from,
            @RequestParam String to) {

        List<Map<String, Object>> paths = new ArrayList<>();

        try (Session session = driver.session()) {

            var result = session.run(
                    """
                   MATCH path = (start {name: $from})-[:LEADS_TO*1..10]->(end {name: $to})
RETURN [node IN nodes(path) | node.name] AS path
LIMIT 1
                    """,
                    Values.parameters("from", from,"to", to)
            );

            if (result.hasNext()) {
                Record record = result.next();

                Map<String, Object> response = new HashMap<>();
                response.put("path", record.get("path").asList());
                paths.add(response);
            }
        }

        return paths;
    }
}
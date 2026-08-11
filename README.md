# SkillPath – Skill Dependency Explorer

SkillPath is a simple web application that helps users explore relationships between software development skills and find a learning path from one skill to another.

## Features

- Explore available technical skills
- Select a starting skill and target skill
- Find a connected learning path
- Visualize multi-hop relationships between skills
- Graph data stored in CognoDB
- REST APIs built using Spring Boot

## Technology Stack

- Java 17
- Spring Boot
- Maven
- CognoDB
- Neo4j Java Driver
- HTML
- CSS
- JavaScript

## Why a Graph Database?

SkillPath focuses on relationships between skills rather than only storing independent records.

For example:

Java → Spring → Spring Boot

and

Java → JDBC → SQL

These connected paths are naturally represented using a graph database.

With a relational database, finding multi-step paths would require multiple joins and more complex queries. A graph database allows us to traverse relationships directly.

## Graph Data Model

```mermaid
graph LR
    Java[Skill: Java]
    JDBC[Skill: JDBC]
    SQL[Skill: SQL]
    Spring[Skill: Spring]
    Boot[Skill: Spring Boot]
    REST[Skill: REST API]
    Backend[Job Role: Backend Developer]

    Java -->|LEADS_TO| JDBC
    JDBC -->|REQUIRES| SQL
    Java -->|LEADS_TO| Spring
    Spring -->|LEADS_TO| Boot
    Boot -->|REQUIRES| REST
    Boot -->|USED_FOR| Backend
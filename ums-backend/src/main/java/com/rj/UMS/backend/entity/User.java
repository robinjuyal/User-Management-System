package com.rj.UMS.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Use UUID instead of IDENTITY
    private String id;

    @NotBlank(message = "Username is required")
    private String username;

    @NotNull(message = "Age is required")
    private Integer age;

    @ElementCollection
    private List<String> hobbies;
}

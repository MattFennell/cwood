package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.CollegeTeamManager;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamStatsDTO;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Teams")
public class CollegeTeamController {

    private static final Logger log = LoggerFactory.getLogger(WeeksController.class);

    private CollegeTeamManager collegeTeamManager;

    @Autowired
    public CollegeTeamController(CollegeTeamManager collegeTeamManager) {
        this.collegeTeamManager = collegeTeamManager;
    }

    @ApiOperation(value = Icons.key + " Make a college team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "College team successfully made"),
            @ApiResponse(code = 400, message = "College team with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/make")
    @PreAuthorize("hasRole('ADMIN')")
    public CollegeTeamDTO makeCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                                @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(200);
            return collegeTeamManager.makeTeam(name);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = Icons.key + " Delete a college team ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "College team successfully deleted"),
            @ApiResponse(code = 400, message = "No team with that name exists or it has players associated with it"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                              @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(201);
            collegeTeamManager.deleteTeam(user, name);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Add stats to a college team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Stats successfully added"),
            @ApiResponse(code = 400, message = "No team with that name exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/stats/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addStatsToCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                                      @RequestBody CollegeTeamStatsDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(200);
            collegeTeamManager.addStatsToCollegeTeam(dto);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
    }

    @ApiOperation(value = Icons.key + " Edit stats for a college team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Stats successfully edited for college team"),
            @ApiResponse(code = 400, message = "No team with that name exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/stats/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public void editCollegeTeamStats(@AuthenticationPrincipal ApplicationUser user,
                                     @RequestBody CollegeTeamStatsDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(200);
            collegeTeamManager.editCollegeTeamStats(dto);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
    }

    @ApiOperation(value = "Get all the college teams",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/college/all/sort/{sort-id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<CollegeTeamDTO> getAllCollegeTeams(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("sort-id") String sortBy) {
        try {
            response.setStatus(200);
            return collegeTeamManager.getAllCollegeTeams(sortBy);
        } catch (Exception e) {
            response.setStatus(400);
        }
        return Collections.emptyList();
    }
}

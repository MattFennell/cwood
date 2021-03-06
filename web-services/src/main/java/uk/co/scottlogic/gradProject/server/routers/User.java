package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserManager;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserRepo;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api")
@Api(value = "user", description = "Operations pertaining to User details (For authentication see"
        + " token)")
public class User {

    private ApplicationUserRepo applicationUserRepo;

    private ApplicationUserManager applicationUserManager;

    @Autowired
    public User(ApplicationUserRepo applicationUserRepo,
                ApplicationUserManager applicationUserManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.applicationUserManager = applicationUserManager;
    }

    @ApiOperation(value = Icons.key
            + " Gets all user details", notes = "Requires User role", response = UserReturnDTO.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Users successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Iterable<ApplicationUser> getAll(@AuthenticationPrincipal ApplicationUser user,
                                            HttpServletResponse response) {
        try {
            return applicationUserRepo.findAll();
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        try {
            response.sendError(500, "Cannot be no users in the system if this is performed");
        } catch (IOException e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = "Gets current user details", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public UserReturnDTO getCurrent(@AuthenticationPrincipal ApplicationUser user,
                                    HttpServletResponse response) {
        try {
            return new UserReturnDTO(user);
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return null;
    }

    @ApiOperation(value = "Returns true if user is an admin", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/isAdmin")
    @PreAuthorize("hasRole('USER')")
    public boolean getIsAdmin(@AuthenticationPrincipal ApplicationUser user,
                                    HttpServletResponse response) {
        try {
            return applicationUserManager.isAdmin(user);
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return false;
    }

    @ApiOperation(value = "Returns true if user is a captain", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/isCaptain")
    @PreAuthorize("hasRole('USER')")
    public boolean getIsCaptain(@AuthenticationPrincipal ApplicationUser user,
                              HttpServletResponse response) {
        try {
            return applicationUserManager.isCaptain(user);
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return false;
    }

    @ApiOperation(value = "Gets users remaining budget", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/budget")
    @PreAuthorize("hasRole('USER')")
    public double getRemainingBudget(@AuthenticationPrincipal ApplicationUser user,
                                    HttpServletResponse response) {
        try {
            return user.getRemainingBudget();
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return 0;
    }

    @ApiOperation(value = "Get the team a user is captain of", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/team/captain")
    @PreAuthorize("hasRole('USER')")
    public CollegeTeamDTO getTeamUserCaptainOf(@AuthenticationPrincipal ApplicationUser user,
                                               HttpServletResponse response) {
        try {
            return applicationUserManager.getTeamUserCaptainOf(user);
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return null;
    }

    @ApiOperation(value = "Set the users team name", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Team Name Successfully Set"),
            @ApiResponse(code = 400, message = "Team name property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping("/user/teamName")
    @PreAuthorize("hasRole('USER')")
    public boolean patchTeamName(@AuthenticationPrincipal ApplicationUser user,
                              String teamName, HttpServletResponse response) {
        try {
            applicationUserManager.setTeamName(user, teamName);
            return true;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
        return false;
    }

    @ApiOperation(value = Icons.key
            + " Resets the users password", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Team Name Successfully Set"),
            @ApiResponse(code = 400, message = "Team name property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping("/user/resetPassword")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean resetPassword(@AuthenticationPrincipal ApplicationUser user,
                                 String resetPassword, HttpServletResponse response) {
        try {
            applicationUserManager.resetUserPassword(user, resetPassword);
            return true;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
        return false;
    }

    @ApiOperation(value = "Patches current user details", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User Successfully Patched"),
            @ApiResponse(code = 400, message = "Patch property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PatchMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public void patchCurrent(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody UserPatchDTO dto, HttpServletResponse response) {
        try {
            applicationUserManager.patchUser(user, dto);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
    }

    @ApiOperation(value = "Patches current user password", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User Successfully Patched"),
            @ApiResponse(code = 400, message = "Patch property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping("/user/password")
    @PreAuthorize("hasRole('USER')")
    public boolean patchPassword(@AuthenticationPrincipal ApplicationUser user,
                              @RequestBody PatchPassword dto, HttpServletResponse response) {
        try {
            applicationUserManager.patchPassword(user, dto);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                response.setStatus(500);
            }
        }
        return false;
    }

    @ApiOperation(value = "Deletes Current user", notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 204, message = "User Successfully deleted"),
            @ApiResponse(code = 403, message = "Not permitted to do that")})
    @DeleteMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public void deleteCurrent(@AuthenticationPrincipal ApplicationUser user,
                              HttpServletResponse response) {
        applicationUserRepo.delete(user);
        response.setStatus(204);
    }

    @ApiOperation(value = "Gets the info for a user id",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/user/info/{id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid week"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public UserReturnDTO getUserInfo(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("id") String id) {
        try {
            response.setStatus(200);
            return applicationUserManager.findUserStats(id);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }
    
    @ApiOperation(value = "Gets the remaining budget for a user",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/user/{id}/remainingBudget")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid week"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public double getRemainingBudget(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("id") String id) {
        try {
            response.setStatus(200);
            return applicationUserManager.findRemainingBalance(id);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return 0;
    }


    @ApiOperation(value = Icons.key + " Make a user captain of a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/user/makeCaptain")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean makeUserCaptain(@AuthenticationPrincipal ApplicationUser user,
                                @RequestBody MakeCaptainDTO dto,
                                HttpServletResponse response) {
        try {
            response.setStatus(200);
            applicationUserManager.makeUserCaptainOfTeam(user, dto.getUsername(), dto.getTeamname());
            return true;

        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Make another user an admin", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Admin successfully made"),
            @ApiResponse(code = 400, message = "Invalid request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/user/makeAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean makeUserAdmin(@AuthenticationPrincipal ApplicationUser user, String username, HttpServletResponse response) {
        try {
            response.setStatus(200);
            applicationUserManager.makeUserAdmin(user, username);
            return true;

        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }
}
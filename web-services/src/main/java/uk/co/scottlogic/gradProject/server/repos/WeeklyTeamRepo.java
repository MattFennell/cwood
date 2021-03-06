package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WeeklyTeamRepo extends CrudRepository<UsersWeeklyTeam, UUID> {

    // The first element in the returned list is the most recent date
    @Query(value = "FROM UsersWeeklyTeam WHERE user = ?1 AND week > -1")
    List<UsersWeeklyTeam> findWeeklyTeams(ApplicationUser user);

    List<UsersWeeklyTeam> findByPlayersAndWeek(Player player, Integer week);

    @Query(value = "FROM UsersWeeklyTeam WHERE week = -1 AND user = ?1")
    Optional<UsersWeeklyTeam> findActiveTeam(ApplicationUser user);

    @Query(value = "FROM UsersWeeklyTeam WHERE week = -1")
    List<UsersWeeklyTeam> findAllActiveTeams();

    @Query(value = "FROM UsersWeeklyTeam WHERE user = ?1 AND week = ?2")
    Optional<UsersWeeklyTeam> findByUserByWeek(ApplicationUser user, Integer week);

    @Query(value = "FROM UsersWeeklyTeam WHERE user = ?1 AND week >= ?2")
    List<UsersWeeklyTeam> findByUserAfterWeek(ApplicationUser user, Integer week);

    @Query(value = "FROM UsersWeeklyTeam WHERE week = ?1 AND points = (SELECT MAX(points) FROM UsersWeeklyTeam WHERE week = ?1)")
    List<UsersWeeklyTeam> findUserWithMostPoints(Integer week);

    @Query(value = "SELECT week FROM UsersWeeklyTeam WHERE week = (SELECT MAX(week) FROM UsersWeeklyTeam)")
    Integer findNumberOfWeeks();

    @Query(value = "SELECT avg(points) FROM UsersWeeklyTeam WHERE week = ?1")
    double findAveragePointsInWeek(Integer week);

    @Query(value = "SELECT points FROM UsersWeeklyTeam WHERE user = ?1 AND week = ?2 ")
    Optional<Integer> findPointsInWeekByUser(ApplicationUser user, Integer week);

}
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoriList, HistoryContainer, Status } from './styles';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const History = () => {
  const { cycles } = useContext(CyclesContext);

  function displayCycleListReversed(cycles: Cycle[]) {
    const array = [];
    for (let i = cycles.length - 1; i >= 0; i--) {
      array.push(
        <tr key={cycles[i].id}>
          <td>{cycles[i].task}</td>
          <td>{cycles[i].minutesAmount} minutos</td>
          <td>{cycles[i].startDate.toISOString()}</td>
          <td>
            {cycles[i].finishedDate && (
              <Status statusColor='green'>Concluido</Status>
            )}
            {cycles[i].interruptedDate && (
              <Status statusColor='red'>Interrompido</Status>
            )}
            {!cycles[i].finishedDate && !cycles[i].interruptedDate && (
              <Status statusColor='yellow'>Em andamento</Status>
            )}
          </td>
        </tr>
      );
    }

    return array;
  }

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoriList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayCycleListReversed(cycles)}
            {/* {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{cycle.startDate.toISOString()}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor='green'>Concluido</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor='red'>Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor='yellow'>Em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}  */}
          </tbody>
        </table>
      </HistoriList>
    </HistoryContainer>
  );
};

export default History;
